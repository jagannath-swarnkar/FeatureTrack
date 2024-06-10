import { Switch } from "react-router";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { RoutesEnum } from "./utils/types";
import Homepage from "./views/homepage/Homepage";
import ModuleDetails from "./views/module-details/ModuleDetails";
import FeatureDetails from "./views/feature-details/FeatureDetails";
function App() {
	// const state = useSelector((Store: ReduxStore) => Store.State);
	// const dispatch = useDispatch();
	// const profileData = useSelector((Store: ReduxStore) => Store.State);
	// const token = getCookie("token");
	// const [isLoading, setIsLoading] = useState(true);
	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setIsLoading(false);
	// 	}, 1000);
	// 	if (!profileData.profile?.totalSpends && token) {
	// 		dispatch(getProfileDataAction());
	// 	}
	// 	if (token) {
	// 		if (!state.categories?.length) {
	// 			dispatch(getAllCategoriesAction());
	// 		}
	// 		if (!state.accounts?.length) {
	// 			dispatch(getAllAccountsAction());
	// 		}
	// 	}
	// }, []);

	return (
		<Router>
			<div className="App">
				<Switch>
					{/* <Route exact path={RoutesEnum.login}>
						<LoginPage />
					</Route> */}
					<Route exact path={RoutesEnum.home}>
						<Homepage />
					</Route>
					<Route exact path={`/modules/:moduleId`}>
						<ModuleDetails />
					</Route>
					<Route path={`/modules/:moduleId/f/:featureId`}>
						<FeatureDetails />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
