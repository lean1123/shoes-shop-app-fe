import Link from "next/link";
import React from "react";

function SignUpPage() {
  return (
    <div>
      SignUpPage
      <Link href={"/home"}>Redirect to HomePage</Link>
    </div>
  );
}

export default SignUpPage;
