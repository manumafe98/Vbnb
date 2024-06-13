import { Input, Button } from "@nextui-org/react";

export const SignInFormComponent = () => {

  return (
    <section className="form-container">
      <div className="form">
        <Input type="email" variant="bordered" label="Email"/>
        <Input type="password" variant="bordered" label="password"/>
        <Button radius="full" className="bg-[#ff6f00] text-white">
          Sign in
        </Button>
      </div>
    </section>
  )
}
