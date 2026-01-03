/* eslint-disable @typescript-eslint/no-explicit-any */
import { ISalesSummary, TArgsParam } from "@/types";
import dayjs from "dayjs";
import { useState } from "react";
import { useDebounced } from "./use-debounce";

export function useSalesReport<TSalesReport>(useGetAllSalesReportQuery: any) {
  const [clintId, setClientId] = useState<string | undefined>(undefined);
  const [tourGroupId, setTourGroupId] = useState<string | undefined>(undefined);
  const [employeeId, setEmployeeId] = useState<string | undefined>(undefined);
  const [agentId, setAgentId] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [dateRange, setDateRange] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null]
  >([null, null]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const query: TArgsParam = { page, limit, sortBy, sortOrder };
  query["startDate"] = dateRange[0]?.format("YYYY-MM-DD");
  query["endDate"] = dateRange[1]?.format("YYYY-MM-DD");
  if (clintId) {
    query["clientId"] = clintId;
  }
  if (employeeId) {
    query["salesById"] = employeeId;
  }
  if (category) {
    query["category"] = category;
  }

  if (tourGroupId) {
    query["tourGroupId"] = tourGroupId;
  }
  if (agentId) {
    query["agentId"] = agentId;
  }

  const debouncedSearchTerm = useDebounced({
    searchQuery: search || "",
    delay: 500,
  });
  if (debouncedSearchTerm) query["search"] = debouncedSearchTerm;
  const {
    data: salesReport,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllSalesReportQuery({ args: query });

  return {
    salesReport: {
      data: salesReport?.data?.results as TSalesReport[],
      summary: salesReport?.data?.summary as ISalesSummary,
      metadata: salesReport?.metadata,
      isLoading,
      isFetching,
    },
    search,
    setSearch,
    dateRange,
    setDateRange,
    page,
    setPage,
    limit,
    setLimit,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    refetch,
    clintId,
    setClientId,
    employeeId,
    setEmployeeId,
    setCategory,
    agentId,
    setAgentId,
    category,
    tourGroupId,
    setTourGroupId,
  };
}
