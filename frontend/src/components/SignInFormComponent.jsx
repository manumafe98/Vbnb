import { Input, Button } from "@nextui-org/react";

export const SignInFormComponent = () => {

  return (
    <section className="form-container">
      <div className="form">
        <Input type="email" variant="bordered" label="Email" className="form-input"/>
        <Input type="password" variant="bordered" label="password" className="form-input"/>
        <Button radius="full" className="bg-[#ff6f00] text-white">
          Sign in
        </Button>
      </div>
    </section>
  )
}
