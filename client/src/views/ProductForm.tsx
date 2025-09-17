// @ts-nocheck

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { axiosClient } from "@/lib/axios-client";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import serialize from "form-serialize";
import { NotFound } from "./NotFound";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export const ProductForm = () => {
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get("/categories")
      .then(({ data }) => {
        setCategories(data.data);
      })
      .finally(() => {
        if (id) {
          setDisabled(true);
          axiosClient
            .get(`/products/${id}`)
            .then(({ data: { data } }) => {
              setProduct(data);
              setColors(data.colors || []);
            })
            .catch(() => {
              setProduct(null);
            })
            .finally(() => {
              setDisabled(false);
              setLoading(false);
            });
        }
      });
  }, [id]);

  if (id && !product) {
    return <NotFound />;
  }

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  const handleSave = (e) => {
    e.preventDefault();

    setDisabled(true);
    setError(null);
    const data = serialize(e.target, { hash: true });
    if (!data.colors) {
      data.colors = [];
    }

    if (id) {
      axiosClient
        .put(`/products/${id}`, data)
        .then(
          ({
            data: {
              data: { id },
            },
          }) => {
            navigate(`/products/${id}`);
          }
        )
        .catch(({ response: { data } }) => {
          setError(data.message);
        })
        .finally(() => {
          setDisabled(false);
        });
    } else {
      axiosClient
        .post("/products", data)
        .then(
          ({
            data: {
              data: { id },
            },
          }) => {
            navigate(`/products/${id}`);
          }
        )
        .catch(({ response: { data } }) => {
          setError(data.message);
        })
        .finally(() => {
          setDisabled(false);
        });
    }
  };

  const handleRemove = (index) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  return (
    <main className="flex flex-col flex-1">
      <Card className="w-full max-w-sm m-auto">
        <form onSubmit={handleSave} className="contents">
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Category</Label>
                <Select
                  name="category_id"
                  required
                  defaultValue={product?.category_id?.toString()}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={"Select a category"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Name</Label>
                <Input
                  name="name"
                  type="text"
                  defaultValue={product?.name}
                  placeholder="Books"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>Price</Label>
                <Input
                  name="price"
                  type="number"
                  defaultValue={product?.price}
                  placeholder="10.00"
                  required
                />
              </div>

              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setColors([...colors, { name: "", hex_code: "" }]);
                }}
                disabled={disabled}
              >
                Add Color
              </Button>
              {!!colors.length &&
                colors.map((color, index) => (
                  <div className="grid grid-cols-3 gap-2" key={color.id}>
                    <Input
                      name={`colors[${index}][name]`}
                      type="text"
                      value={color.name}
                      placeholder="Color Name"
                      onChange={(e) => {
                        const newColors = [...colors];
                        newColors[index].name = e.target.value;
                        setColors(newColors);
                      }}
                      required
                    />
                    <Input
                      name={`colors[${index}][hex_code]`}
                      type="text"
                      value={color.hex_code}
                      placeholder="Color Code"
                      onChange={(e) => {
                        const newColors = [...colors];
                        newColors[index].hex_code = e.target.value;
                        setColors(newColors);
                      }}
                      required
                    />
                    <Button
                      type="button"
                      className="w-full"
                      onClick={() => handleRemove(index)}
                      variant={"outline"}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" disabled={disabled}>
              Save
            </Button>
          </CardFooter>
          {error && <div className="text-red-600 text-center">{error}</div>}
        </form>
      </Card>
    </main>
  );
};
