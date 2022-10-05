import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5050/api" }),
	tagTypes: ["Note", "User"],
	endpoints: (builder) => ({}),
});
