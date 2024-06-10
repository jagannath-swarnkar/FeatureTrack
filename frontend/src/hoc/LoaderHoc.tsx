import React, { useEffect, useState } from "react";
import { PagerLoader } from "../utils/rxSubjects";

const LoaderHoc = () => {
	const [loading, setLoading] = useState(false);
	const rxLoaderHandler = PagerLoader.subscribe((flag) => {
		setLoading(!!flag);
	});
	useEffect(() => {
		return () => {
			rxLoaderHandler && rxLoaderHandler.unsubscribe();
		};
	}, []);

	return (
		<React.Fragment>
			{loading ? (
				<div id="loading-hoc">
					<div className="loading_hoc_bg"></div>
					<div className="loding_hoc_container">
						<div className="loader_cont">
							<div className="loader"></div>
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</React.Fragment>
	);
};

export default LoaderHoc;
