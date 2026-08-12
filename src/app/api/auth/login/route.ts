// app/api/login/route.ts
/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-12-31 06:00:17
 * @Description: Login API Route
 */

import { loginHandler } from "next-auth-mfelfelani72";



export const POST = loginHandler(`${process.env.API_URL}/login`);