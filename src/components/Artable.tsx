import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import type { DataTablePageEvent } from "primereact/datatable";
import { Column } from "primereact/column";

import { fetchArtworks } from "../api/artworks";
import type { Artwork } from "../types/artwork";

export default function ArtTable() {
  const [rows, setRows] = useState<Artwork[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [loading, setLoading] = useState(false);

  async function loadData(p: number) {
    setLoading(true);
    const res = await fetchArtworks(p);
    setRows(res.data);
    setTotal(res.pagination.total);
    setRowsPerPage(res.pagination.limit);
    setLoading(false);
  }

  useEffect(() => {
    loadData(1);
  }, []);

  const onPageChange = (e: DataTablePageEvent) => {
    const newPage = (e.page ?? 0) + 1;
    setPage(newPage);
    loadData(newPage);
  };

  return (
    <DataTable
      value={rows}
      paginator
      lazy
      totalRecords={total}
      rows={rowsPerPage}
      first={(page - 1) * rowsPerPage}
      onPage={onPageChange}
      loading={loading}
    >
      <Column field="title" header="Title" />
      <Column field="place_of_origin" header="Origin" />
      <Column field="artist_display" header="Artist" />
      <Column field="inscriptions" header="Inscriptions" />
      <Column field="date_start" header="Start" />
      <Column field="date_end" header="End" />
    </DataTable>
  );
}
