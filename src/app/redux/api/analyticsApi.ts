/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DateGroupedAnalytics } from "../../../types/interface";
import type { ApiDataType } from "../../../types/type";
import { baseApi } from "./baseApi";

export interface TrackQueryArgs {
  page?: number;
  limit?: number;
  date?: string;
}

export interface TrackPaginationMeta {
  page: number;
  limit: number;
  totalSessions: number;
  hasMore: boolean;
}

// Extends your existing ApiDataType<DateGroupedAnalytics> with pagination meta
export type PaginatedTraceResponse = ApiDataType<DateGroupedAnalytics> & {
  meta?: TrackPaginationMeta;
};

export const traceApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllTrackData: builder.query<
        PaginatedTraceResponse,
        TrackQueryArgs | void
      >({
        query: (params) => ({
          url: "trace",
          method: "GET",
          params: {
            page: params?.page ?? 1,
            limit: params?.limit ?? 20,
            ...(params?.date ? { date: params.date } : {}),
          },
        }),
        providesTags: ["Trace"],

        // Separate cache entries for default 5-day view vs. specific searched dates
        serializeQueryArgs: ({ endpointName, queryArgs }) => {
          const dateKey = queryArgs?.date || "last-5-days";
          return `${endpointName}-${dateKey}`;
        },

        // Append newly scrolled 20 sessions into the existing date groups
        merge: (currentCache, newResponse, { arg }) => {
          const currentPage = arg?.page ?? 1;

          // On page 1 (initial load, date search, or refresh), replace cache
          if (currentPage === 1) {
            currentCache.data = newResponse.data;
            currentCache.meta = newResponse.meta;
            return;
          }

          const currentGroups = Array.isArray(currentCache.data)
            ? currentCache.data
            : [];
          const incomingGroups = Array.isArray(newResponse.data)
            ? newResponse.data
            : [];

          incomingGroups.forEach((incomingGroup: any) => {
            const existingGroup = currentGroups.find(
              (g) => g._id === incomingGroup._id,
            );

            if (existingGroup) {
              const existingIds = new Set(
                existingGroup.sessions.map((s: any) => s.sessionId),
              );
              const uniqueNewSessions = incomingGroup.sessions.filter(
                (s: any) => !existingIds.has(s.sessionId),
              );
              existingGroup.sessions.push(...uniqueNewSessions);
              // Keep the true backend count for this date
              existingGroup.totalSessions = incomingGroup.totalSessions;
            } else {
              (currentGroups as any[]).push(incomingGroup);
            }
          });

          currentCache.data = currentGroups as typeof currentCache.data;
          currentCache.meta = newResponse.meta;
        },

        // Trigger a new network request whenever page or date changes
        forceRefetch({ currentArg, previousArg }) {
          return (
            currentArg?.page !== previousArg?.page ||
            currentArg?.date !== previousArg?.date
          );
        },
      }),
    };
  },
});

export const { useGetAllTrackDataQuery } = traceApi;
