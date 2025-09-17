// @ts-nocheck

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

export const Category = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`/categories/${id}`)
      .then(({ data: { data } }) => {
        setCategory(data);
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
      .delete(`/categories/${id}`)
      .then(() => {
        navigate("/categories");
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      })
      .finally(() => {
        setDisabled(false);
      });
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!category) {
    return <div className="p-4">Category not found</div>;
  }

  return (
    <main className="p-4">
      <Card className="p-4">
        <div className="flex gap-2">
          <h1 className="text-2xl font-bold">{category?.name}</h1>
          <div className="flex-1" />
          <Button
            onClick={() => navigate(`/categories/${id}/edit`)}
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
      </Card>
      {!!category.products.length && (
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
            {category?.products.map((product) => (
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
      )}
    </main>
  );
};
