"use server";

import { Cookies } from "@/utils/constants";
import { addYears } from "date-fns";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { authActionClient } from "./safe-action";
import { changeSpendingPeriodSchema } from "./schema";

export const changeSpendingPeriodAction = authActionClient
  .schema(changeSpendingPeriodSchema)
  .action(async ({ parsedInput: params, ctx: { user } }) => {
    console.log("katt", params);
    cookies().set({
      name: Cookies.SpendingPeriod,
      value: JSON.stringify(params),
      expires: addYears(new Date(), 1),
    });

    revalidateTag(`spending_${user.team_id}`);

    return params;
  });
