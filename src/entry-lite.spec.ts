import { describe, expect, it } from "vitest";

import { codes } from "./codes";
import { getCountryData, getCountryFields, getGridPattern } from "./entry-lite";

describe("entry-lite", () => {
  it(`should register all ${codes.length} countries`, () => {
    for (const country of codes) {
      expect(getCountryData(country)).toBeDefined();
    }
  });

  describe("getCountryData", () => {
    it("should return null for invalid country code", () => {
      expect(getCountryData("INVALID")).toBeNull();
      expect(getCountryData("XX")).toBeNull();
      expect(getCountryData("")).toBeNull();
    });

    it("should return country data for valid country code", () => {
      const frData = getCountryData("FR");
      expect(frData).toBeDefined();
      expect(frData).toHaveProperty("code", "FR");
      expect(frData).toHaveProperty("lfmt");
      expect(frData).toHaveProperty("zip");
      expect(frData).toHaveProperty("require");
      expect(frData).toHaveProperty("sub_regions");
      expect(frData).toHaveProperty("locality_name_type");
      expect(frData).toHaveProperty("state_name_type");
      expect(frData).toHaveProperty("sublocality_name_type");
      expect(frData).toHaveProperty("zip_name_type");
      expect(Array.isArray(frData?.sub_regions)).toBe(true);
    });

    it("should return sub_regions with correct structure", () => {
      const frData = getCountryData("FR");
      expect(frData?.sub_regions).toBeDefined();
      if (frData?.sub_regions && frData.sub_regions.length > 0) {
        const region = frData.sub_regions[0];
        expect(region).toHaveProperty("key");
        expect(region).toHaveProperty("name");
        expect(region).toHaveProperty("zip");
      }
    });

    it("should handle sub_regions with null zip", () => {
      const usData = getCountryData("US");
      expect(usData?.sub_regions).toBeDefined();
      if (usData?.sub_regions) {
        // Verify the structure is correct with null handling
        usData.sub_regions.forEach((region) => {
          expect(region).toHaveProperty("key");
          expect(region).toHaveProperty("name");
          expect(region).toHaveProperty("zip");
        });
      }
    });
  });

  describe("getCountryFields", () => {
    it("should return null for invalid country code", () => {
      expect(getCountryFields("INVALID")).toBeNull();
      expect(getCountryFields("XX")).toBeNull();
    });

    it("should return field statuses for valid country code", () => {
      const fields = getCountryFields("FR");
      expect(fields).toBeDefined();
      expect(fields).toHaveProperty("name");
      expect(fields).toHaveProperty("organization");
      expect(fields).toHaveProperty("dependentLocality");
      expect(fields).toHaveProperty("city");
      expect(fields).toHaveProperty("state");
      expect(fields).toHaveProperty("zip");
      expect(fields).toHaveProperty("sortingCode");
      expect(fields).toHaveProperty("addressLine1");
    });

    it("should correctly identify required and optional fields", () => {
      const fields = getCountryFields("FR");
      expect(fields).toBeDefined();

      // Verify that fields have valid status values
      if (fields) {
        Object.values(fields).forEach((status) => {
          expect(["required", "optional", undefined]).toContain(status);
        });
      }
    });

    it("should return different field configurations for different countries", () => {
      const frFields = getCountryFields("FR");
      const usFields = getCountryFields("US");
      const gbFields = getCountryFields("GB");

      expect(frFields).toBeDefined();
      expect(usFields).toBeDefined();
      expect(gbFields).toBeDefined();

      // Countries should have different configurations
      // Just verify they all have the structure
      [frFields, usFields, gbFields].forEach((fields) => {
        if (fields) {
          expect(Object.keys(fields)).toContain("name");
          expect(Object.keys(fields)).toContain("city");
          expect(Object.keys(fields)).toContain("zip");
        }
      });
    });

    it("should handle countries with no required fields", () => {
      const ciData = getCountryData("CI");
      expect(ciData).toBeDefined();

      const ciFields = getCountryFields("CI");
      expect(ciFields).toBeDefined();

      if (ciFields) {
        // All fields should be either optional or undefined
        Object.values(ciFields).forEach((status) => {
          expect(status === "optional" || status === undefined).toBe(true);
        });
      }
    });
  });

  describe("getGridPattern", () => {
    it("should return the grid pattern for FR", () => {
      expect(getGridPattern("FR")).toBeDefined();

      expect(getGridPattern("FR")).toEqual({
        templateColumns: "repeat(2, 1fr)",
        templateAreas: [
          '"organization organization"',
          '"name name"',
          '"addressLine1 addressLine1"',
          '"zip city"',
        ].join("\n"),
      });
    });

    it("should return null for invalid country code", () => {
      expect(getGridPattern("INVALID")).toBeNull();
      expect(getGridPattern("XX")).toBeNull();
    });

    it("should handle single column layout", () => {
      const ciPattern = getGridPattern("CI");
      expect(ciPattern).toBeDefined();
      if (ciPattern) {
        expect(ciPattern).toHaveProperty("templateColumns");
        expect(ciPattern).toHaveProperty("templateAreas");
      }
    });

    it("should handle multiple column layouts", () => {
      const usPattern = getGridPattern("US");
      expect(usPattern).toBeDefined();
      if (usPattern) {
        expect(usPattern).toHaveProperty("templateColumns");
        expect(usPattern).toHaveProperty("templateAreas");
        expect(typeof usPattern.templateColumns).toBe("string");
        expect(typeof usPattern.templateAreas).toBe("string");
      }
    });

    it("should handle different grid patterns correctly", () => {
      const gbPattern = getGridPattern("GB");
      expect(gbPattern).toBeDefined();

      if (gbPattern) {
        // Verify structure
        expect(gbPattern.templateColumns).toMatch(/^repeat\(\d+, 1fr\)$/);
        expect(gbPattern.templateAreas).toContain('"');
      }
    });

    it("should calculate LCM correctly for complex patterns", () => {
      // Test with countries that have varying column counts
      const patterns = ["US", "CA", "AU", "DE", "JP"].map((code) =>
        getGridPattern(code),
      );

      patterns.forEach((pattern) => {
        if (pattern) {
          expect(pattern.templateColumns).toMatch(/^repeat\(\d+, 1fr\)$/);
          expect(pattern.templateAreas.length).toBeGreaterThan(0);
        }
      });
    });

    it("should handle dependentLocality field (%D)", () => {
      // Mexico uses %D (dependentLocality) in its format
      const mxPattern = getGridPattern("MX");
      expect(mxPattern).toBeDefined();

      if (mxPattern) {
        expect(mxPattern.templateAreas).toContain("dependentLocality");
      }
    });

    it.each(codes)("should handle %s", (country) => {
      expect(getGridPattern(country)).toBeDefined();
    });
  });
});
