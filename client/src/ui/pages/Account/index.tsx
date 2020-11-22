import {StateReturnTypes} from "@appchat/core/store/types";
import {ContainerPage} from "@appchat/ui/containers/page";
import * as React from "react";
import {useSelector} from "react-redux";

const Account = () => {
    const {user} = useSelector((state: StateReturnTypes) => state.UserReducer);
    return (
        <ContainerPage title={`${user.firstName} ${user.lastName}`} className="account">
            <p>{user.email}: {user.id}</p>
        </ContainerPage>);
};

export default Account;
