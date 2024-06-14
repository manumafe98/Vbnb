import { DragAndDropImageComponent } from "./DragAndDropImageComponent"
import { Input, Button } from "@nextui-org/react";

export const AddElementFormComponent = ({ elementName }) => {
  return (
    <section className="form-container">
      <div className="form form-element">
        {elementName !== "City" && (
          <DragAndDropImageComponent/>
        )}
        <Input 
          type="text" 
          variant="bordered" 
          label={`${elementName}`}
          className="form-input"/>
        {elementName === "City" && (
          <Input type="text" variant="bordered" label="Country" className="form-input"/>
        )}
        <Button radius="full" className="bg-[#ff6f00] text-white">
            Add { elementName }
        </Button>
      </div>
    </section>
  )
}
