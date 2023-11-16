export type GoongPredictionResponse = {
  predictions: Prediction[] | [];
  executed_time?: number;
  executed_time_all?: number;
  status?: string;
};

export type Prediction = {
  compound: Compound;
  description: string;
  matched_substrings?: any[];
  place_id?: string | null;
  reference?: string;
  structured_formatting?: StructuredFormatting;
  terms?: any[];
  has_children?: boolean;
  display_type?: string;
  score?: number;
  plus_code?: PlusCode;
};

export type Compound = {
  commune: string;
  district: string;
  province: string;
};

export type PlusCode = {
  compound_code?: string;
  global_code?: string;
};

export type StructuredFormatting = {
  main_text?: string;
  secondary_text?: string;
};

export type GoongPlaceDetailResponse = {
  result?: GoongPlaceDetailResult;
  status?: string;
};

export type GoongPlaceDetailResult = {
  place_id?: string;
  formatted_address?: string;
  geometry?: Geometry;
  name?: string;
};

export type Geometry = {
  location?: Location;
};

export type Location = {
  lat?: number;
  lng?: number;
};
