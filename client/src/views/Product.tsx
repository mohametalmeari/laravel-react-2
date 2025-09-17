// @ts-nocheck

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
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
import { useNavigate, useParams } from "react-router";

export const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`/products/${id}`)
      .then(({ data: { data } }) => {
        setProduct(data);
        console.log(data);
      })
      .catch()
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    setDisabled(true);
    axiosClient
      .delete(`/products/${id}`)
      .then(() => {
        navigate("/products");
      })
      .catch(() => {
        setDisabled(false);
      });
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!product) {
    return <div className="p-4">Product not found</div>;
  }

  return (
    <main className="p-4">
      <Card className="p-4">
        <CardTitle>
          <div className="flex gap-2">
            <h1 className="text-2xl font-bold">{product?.name}</h1>
            <div className="flex-1" />
            <Button
              onClick={() => navigate(`/products/${id}/edit`)}
              disabled={disabled}
            >
              Edit
            </Button>
            <Button
              onClick={handleDelete}
              variant="destructive"
              disabled={disabled}
            >
              Delete
            </Button>
          </div>
        </CardTitle>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Price: ${product?.price}
          </p>
          <p className="text-sm text-muted-foreground">
            Category: {product?.category?.name || "-"}
          </p>
          <p className="text-sm text-muted-foreground">
            Description: {product?.description || "-"}
          </p>
        </CardContent>
      </Card>
      {!!product.colors.length && (
        <Table>
          <TableCaption>A list of colors.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Color Name</TableHead>
              <TableHead>Color Code</TableHead>
              <TableHead>Color</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {product?.colors.map((product) => (
              <TableRow key={product?.id}>
                <TableCell className="font-medium">{product?.id}</TableCell>
                <TableCell>{product?.name}</TableCell>
                <TableCell>{product?.hex_code}</TableCell>
                <TableCell>
                  <div
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: product?.hex_code }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </main>
  );
};
