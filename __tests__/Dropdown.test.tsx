import React from "react";
import "react-native";
import {} from 'native-base'
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

import { Dropdown } from "../src/components/dropdown/Dropdown";

it("renders correctly", () => {
  let options = {
    "type": "static",
    "values": [
      {
        "oid": "1",
        "title": "Çiğdem"
      },
      {
        "oid": "2",
        "title": "Asuman"
      }
    ],
    "titleKey": "title",
    "valueKey": "oid"
  }

  const dropdown = renderer.create(
    <Dropdown tag="q1" options={options} titleKey="title" valueKey="oid" />
  );
  expect(dropdown).toBeDefined();
});

