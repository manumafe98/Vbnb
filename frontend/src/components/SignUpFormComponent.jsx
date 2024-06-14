import { Input, Button } from "@nextui-org/react";
import '../styles/SignUpFormComponent.css'

export const SignUpFormComponent = () => {
  return (
    <section className="form-container">
      <div className="form">
        <div className="text-type-container">
          <Input type="text" variant="bordered" label="Name" className="form-input form-flex"/>
          <Input type="text" variant="bordered" label="Lastname" className="form-input form-flex"/>
        </div>
        <Input type="email" variant="bordered" label="Email" className="form-input"/>
        <Input type="password" variant="bordered" label="password" className="form-input"/>
        <Button radius="full" className="bg-[#ff6f00] text-white">
            Sign Up
        </Button>
      </div>
    </section>
  )
}
