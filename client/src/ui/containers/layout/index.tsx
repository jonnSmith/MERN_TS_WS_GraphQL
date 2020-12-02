import {useQuery} from "@apollo/react-hooks";
import {config} from "@appchat/core/config";
import {CoreNavigation} from "@appchat/core/navigation";
import {ACTIONS} from "@appchat/core/store/constants";
import {StateReturnTypes} from "@appchat/core/store/types";
import {GET_ME} from "@appchat/data/user/queries";
import {IContainerLayoutProps} from "@appchat/ui/containers/interfaces";
import {Layout, useLayoutNavigation} from "@react-md/layout";
import {Configuration} from "@react-md/layout";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";
import {useUpdate} from "react-use";

const LayoutContainer = (props: IContainerLayoutProps): React.ReactElement => {
  const {children} = props;
  const {pathname} = useLocation();
  const update = useUpdate();
  // tslint:disable-next-line:variable-name
  // const [_rendered, transitionProps, dispatch] = useCrossFade();
  // const prevPathname = React.useRef(pathname);
  // if (pathname !== prevPathname.current) {
  //   prevPathname.current = pathname;
  //   dispatch(ENTER);
  // }

  const {data, loading, error} = useQuery(GET_ME, {notifyOnNetworkStatusChange: true});
  const dispatchSaga = useDispatch();

  React.useEffect(() => {
    if (data && typeof data?.user !== "undefined" && !loading) {
      dispatchSaga({type: data.user ? ACTIONS.USER_LOGIN : ACTIONS.USER_LOGOUT, payload: data});
      update();
    }
    return (): void => {
    };
  }, [data, loading]);

  // const [user, setUser] = useState(UserInitState.user);
  const user = useSelector((state: StateReturnTypes) => state.UserReducer.user);

  // useEffect(() => {
  //   if (userdata?.email) { setUser(userdata); }
  //   update();
  //   return (): void => { };
  // }, [userdata]);

  if (error) {
    return <><p>Critical error: {JSON.stringify(error)} </p><a href="/">Reload</a> </>;
  }

  return <Configuration disableRipple={true} disableProgrammaticRipple={true}>
    <Layout
      title={config.app.name}
      navHeaderTitle={config.app.sidebar}
      // @ts-ignore
      treeProps={useLayoutNavigation(CoreNavigation.navs(!!user?.token), pathname, Link)}
    >
      {!loading && children}
    </Layout>
  </Configuration>;
};

export {LayoutContainer};
