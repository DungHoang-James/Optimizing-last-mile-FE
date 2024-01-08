export type GeometryResponse = {
  plus_code?: GeometryPlusCode;
  results?: Result[];
  status?: string;
};

export type GeometryPlusCode = {
  //
};

export type Result = {
  address_components?: AddressComponent[];
  formatted_address?: string;
  geometry?: Geometry;
  place_id?: string;
  reference?: string;
  plus_code?: ResultPlusCode;
  types?: any[];
};

export type AddressComponent = {
  long_name?: string;
  short_name?: string;
};

export type Geometry = {
  location?: Location;
};

export type Location = {
  lat?: number;
  lng?: number;
};

export type ResultPlusCode = {
  compound_code?: string;
  global_code?: string;
};
