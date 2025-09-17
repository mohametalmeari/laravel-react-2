// @ts-nocheck

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { axiosClient } from "@/lib/axios-client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get("/categories")
      .then(({ data: { data } }) => {
        setCategories(data);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <main className="p-4">Loading...</main>;
  }

  if (!categories.length) {
    return <main className="p-4">No categories found.</main>;
  }

  return (
    <main className="p-4">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center">
            <CardTitle className="text-2xl">Categories</CardTitle>
            <div className="flex-1" />
            <Button onClick={() => navigate("/categories/new")}>
              Add Category
            </Button>
          </div>
        </CardHeader>
      </Card>
      <Table>
        <TableCaption>A list of categories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Products</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow
              key={category?.id}
              onClick={() => navigate(`/categories/${category?.id}`)}
            >
              <TableCell className="font-medium">{category?.id}</TableCell>
              <TableCell>{category?.name}</TableCell>
              <TableCell className="text-right">
                {category?.products?.length || "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
};
