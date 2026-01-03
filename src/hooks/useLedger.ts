/* eslint-disable @typescript-eslint/no-explicit-any */
import { TArgsParam } from "@/types";
import dayjs from "dayjs";
import { useState } from "react";

export function useLedger<TEntity, TLedger>(
  useGetEntitiesQuery: any, // যেমন useGetAllSelectAccountsQuery
  useGetLedgerQuery: any, // যেমন useGetAccountLegerQuery
) {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null]
  >([dayjs(), dayjs()]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const {
    data: entities,
    isLoading: isEntitiesLoading,
    error: entitiesError,
  } = useGetEntitiesQuery({
    search,
  });

  const query: TArgsParam = { page, limit, sortBy, sortOrder };
  query["startDate"] =
    dateRange[0]?.format("YYYY-MM-DD") || dayjs().format("YYYY-MM-DD");
  query["endDate"] =
    dateRange[1]?.format("YYYY-MM-DD") || dayjs().format("YYYY-MM-DD");

  const {
    data: ledger,
    isLoading,
    isFetching,
    error: ledgerError,
    refetch,
  } = useGetLedgerQuery(
    { args: query, id: selectedId! },
    { skip: !selectedId },
  );

  return {
    entities: {
      data: entities?.data as TEntity[],
      isLoading: isEntitiesLoading,
      error: entitiesError,
    },
    ledger: {
      data: ledger?.data?.results as TLedger[],
      metadata: ledger?.metadata,
      isLoading,
      isFetching,
      error: ledgerError,
    },
    summary: ledger?.data?.summary,
    selectedId,
    setSelectedId,
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
  };
}
