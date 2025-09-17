// @ts-nocheck

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { axiosClient } from "@/lib/axios-client";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import serialize from "form-serialize";
import { NotFound } from "./NotFound";

export const CategoryForm = () => {
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState({});

  useEffect(() => {
    if (id) {
      setDisabled(true);
      axiosClient
        .get(`/categories/${id}`)
        .then(({ data: { data } }) => {
          setCategory(data);
        })
        .catch(() => {
          setCategory(null);
        })
        .finally(() => {
          setDisabled(false);
        });
    }
  }, [id]);

  if (id && !category) {
    return <NotFound />;
  }

  const handleSave = (e) => {
    e.preventDefault();

    setDisabled(true);
    setError(null);
    const data = serialize(e.target, { hash: true });

    if (id) {
      axiosClient
        .put(`/categories/${id}`, data)
        .then(
          ({
            data: {
              data: { id },
            },
          }) => {
            navigate(`/categories/${id}`);
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
        .post("/categories", data)
        .then(
          ({
            data: {
              data: { id },
            },
          }) => {
            navigate(`/categories/${id}`);
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

  return (
    <main className="flex flex-col flex-1">
      <Card className="w-full max-w-sm m-auto">
        <form onSubmit={handleSave} className="contents">
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Name</Label>
                <Input
                  name="name"
                  type="text"
                  defaultValue={category?.name}
                  placeholder="Books"
                  required
                />
              </div>
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
