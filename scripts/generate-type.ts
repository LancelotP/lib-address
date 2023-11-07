import ts from "typescript";

import { convertAbbrStringToObject } from "../src/utils.ts";

type Data = {
  require?: string;
  fmt?: string;
  state_name_type?: string;
  zip_name_type?: string;
  locality_name_type?: string;
  sublocality_name_type?: string;
};

export function generateTypes(
  dict: Record<string, Data>,
  defaultData: Required<Data>,
) {
  const file = createFile();
  const nodes: ts.DeclarationStatement[] = [];
  const codes = Object.keys(dict);

  const stateTypes = extractUniqueValues(dict, "state_name_type");
  const zipTypes = extractUniqueValues(dict, "zip_name_type");
  const localityTypes = extractUniqueValues(dict, "locality_name_type");
  const sublocalityTypes = extractUniqueValues(dict, "sublocality_name_type");

  nodes.push(createStringLiteralType("CountryCode", codes));
  nodes.push(createStringLiteralType("StateType", stateTypes));
  nodes.push(createStringLiteralType("ZipType", zipTypes));
  nodes.push(createStringLiteralType("LocalityType", localityTypes));
  nodes.push(createStringLiteralType("SublocalityType", sublocalityTypes));

  nodes.push(createBaseAddress());
  nodes.push(createAnyAddress());
  nodes.push(createUnionAddress(codes.filter((code) => code !== "ZZ")));

  Object.entries(dict)
    .filter(([key]) => key !== "ZZ")
    .forEach(([code, { require, fmt }]) => {
      nodes.push(
        createCountryAddress({
          code,
          require: require ?? defaultData.require,
          fmt: fmt ?? defaultData.fmt,
        }),
      );
    });

  return generateFileContent(file, nodes);
}

function extractUniqueValues<T extends Record<string, string | undefined>>(
  dict: Record<string, T>,
  key: keyof T,
) {
  return Array.from(
    new Set(
      Object.values(dict)
        .map((data) => data[key])
        .filter(Boolean),
    ),
  ).sort((a, b) => a!.localeCompare(b!)) as (T[keyof T] & string)[];
}

function createFile() {
  return ts.createSourceFile(
    "",
    "",
    ts.ScriptTarget.ESNext,
    false,
    ts.ScriptKind.TS,
  );
}

function generateFileContent(
  file: ts.SourceFile,
  nodes: ts.DeclarationStatement[],
) {
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  return nodes
    .map((node) => printer.printNode(ts.EmitHint.Unspecified, node, file))
    .join("\n\n");
}

function createStringLiteralType(name: string, values: string[]) {
  return ts.factory.createTypeAliasDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createIdentifier(name),
    undefined,
    ts.factory.createUnionTypeNode(
      values.map((value) =>
        ts.factory.createLiteralTypeNode(ts.factory.createStringLiteral(value)),
      ),
    ),
  );
}

function createBaseAddress() {
  return ts.factory.createTypeAliasDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createIdentifier("BaseAddress"),
    undefined,
    ts.factory.createTypeLiteralNode([
      ts.factory.createPropertySignature(
        undefined,
        ts.factory.createIdentifier("organization"),
        ts.factory.createToken(ts.SyntaxKind.QuestionToken),
        ts.factory.createTypeReferenceNode("string"),
      ),
      ts.factory.createPropertySignature(
        undefined,
        ts.factory.createIdentifier("name"),
        ts.factory.createToken(ts.SyntaxKind.QuestionToken),
        ts.factory.createTypeReferenceNode("string"),
      ),
    ]),
  );
}

function createAnyAddress() {
  const fields = [
    "addressLine1",
    "addressLine2",
    "addressLine3",
    "city",
    "dependentLocality",
    "sortingCode",
    "state",
    "zip",
  ];

  return ts.factory.createTypeAliasDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createIdentifier("AnyAddress"),
    undefined,
    ts.factory.createTypeLiteralNode([
      ts.factory.createPropertySignature(
        undefined,
        ts.factory.createIdentifier("country"),
        undefined,
        ts.factory.createTypeReferenceNode("string"),
      ),
      ...fields.map((field) =>
        ts.factory.createPropertySignature(
          undefined,
          ts.factory.createIdentifier(field),
          ts.factory.createToken(ts.SyntaxKind.QuestionToken),
          ts.factory.createTypeReferenceNode("string"),
        ),
      ),
    ]),
  );
}

function createUnionAddress(codes: string[]) {
  return ts.factory.createTypeAliasDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createIdentifier("Address"),
    undefined,
    ts.factory.createIntersectionTypeNode([
      ts.factory.createTypeReferenceNode("BaseAddress"),
      ts.factory.createTypeReferenceNode("AnyAddress"),
      ts.factory.createUnionTypeNode(
        codes.map((code) =>
          ts.factory.createTypeReferenceNode(`Address${code}`),
        ),
      ),
    ]),
  );
}

function createCountryAddress(data: {
  code: string;
  require: string;
  fmt: string;
}) {
  const requiredFields = Object.entries(convertAbbrStringToObject(data.require))
    .filter(([_, value]) => value)
    .map(([key]) => key);
  const optionalFields = Object.entries(convertAbbrStringToObject(data.fmt))
    .filter(([key, value]) => value && !requiredFields.includes(key))
    .map(([key]) => key);

  if (
    requiredFields.includes("addressLine1") ||
    optionalFields.includes("addressLine1")
  ) {
    optionalFields.push("addressLine2", "addressLine3");
  }

  const fields = [
    ...requiredFields.map((f) => ({ name: f, required: true })),
    ...optionalFields.map((f) => ({ name: f, required: false })),
  ].sort((a, b) => a.name.localeCompare(b.name));

  return ts.factory.createTypeAliasDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createIdentifier(`Address${data.code}`),
    undefined,
    ts.factory.createTypeLiteralNode([
      ts.factory.createPropertySignature(
        undefined,
        ts.factory.createIdentifier("country"),
        undefined,
        ts.factory.createLiteralTypeNode(
          ts.factory.createStringLiteral(data.code.toUpperCase().trim()),
        ),
      ),
      ...fields.map((f) =>
        ts.factory.createPropertySignature(
          undefined,
          ts.factory.createIdentifier(f.name),
          f.required
            ? undefined
            : ts.factory.createToken(ts.SyntaxKind.QuestionToken),
          ts.factory.createTypeReferenceNode("string"),
        ),
      ),
    ]),
  );
}
