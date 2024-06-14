import { CheckInOutComponent } from "./CheckInOutComponent";
import { Input, Button} from "@nextui-org/react";
import '../styles/SearchBarComponent.css'

export const SearchBarComponent = () => {
    
    return(
        <section className="search">
            <div className="search-bar">
                <Input radius="full" type="where" label="Where" placeholder="Search destinations"/>
                <CheckInOutComponent/>
                <Button radius="full" className="h-14 bg-[#ff6f00] text-white">
                    Search
                </Button>
            </div>
        </section>
    );
}
