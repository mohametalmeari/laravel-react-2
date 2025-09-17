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

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get("/products")
      .then(({ data: { data } }) => {
        setProducts(data);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <main className="p-4">Loading...</main>;
  }

  if (!products.length) {
    return <main className="p-4">No products found.</main>;
  }

  return (
    <main className="p-4">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center">
            <CardTitle className="text-2xl">Products</CardTitle>
            <div className="flex-1" />
            <Button onClick={() => navigate("/products/new")}>
              Add Product
            </Button>
          </div>
        </CardHeader>
      </Card>
      <Table>
        <TableCaption>A list of products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Colors</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product?.id}
              onClick={() => navigate(`/products/${product?.id}`)}
            >
              <TableCell className="font-medium">{product?.id}</TableCell>
              <TableCell>{product?.name}</TableCell>
              <TableCell>${product?.price}</TableCell>
              <TableCell className="text-right">
                {product?.colors?.length || "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
};
