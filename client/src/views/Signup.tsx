// @ts-nocheck
import { axiosClient } from "@/lib/axios-client";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import serialize from "form-serialize";
import { useState } from "react";
import { useStateContext } from "@/contexts/store";

export function Signup() {
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const { setToken } = useStateContext();

  const handleSignup = (e) => {
    e.preventDefault();
    setDisabled(true);
    setError(null);
    const data = serialize(e.target, { hash: true });
    axiosClient
      .post(`/register`, data)
      .then(({ data }) => {
        setToken(data.token);
      })
      .catch(({ response: { data } }) => {
        setError(data.message);
      })
      .finally(() => {
        setDisabled(false);
      });
  };

  return (
    <main className="flex flex-col flex-1">
      <Card className="w-full max-w-sm m-auto">
        <form onSubmit={handleSignup} className="contents">
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Name</Label>
                <Input name="name" type="text" placeholder="John" required />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>Password</Label>
                <Input name="password" type="password" required />
              </div>
              <div className="grid gap-2">
                <Label>Password Confirmation</Label>
                <Input name="password_confirmation" type="password" required />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="w-full"
              htmlFor="form"
              disabled={disabled}
            >
              Sign Up
            </Button>
          </CardFooter>
          {error && <div className="text-red-600 text-center">{error}</div>}
        </form>
      </Card>
    </main>
  );
}
