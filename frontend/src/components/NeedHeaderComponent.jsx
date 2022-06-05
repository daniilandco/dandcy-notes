import Header from "./Header";
import AuthService from "../services/AuthService";


export const NeedHeaderComponent = ({Component}) => {
    return AuthService.getCurrentUserID() ? (
        <div className="container dark">
            <div className="app">
                <Header/>
                <Component/>
            </div>
        </div>
    ) : <div className={'validation-error'}>Sorry, you are not authorized</div>
}