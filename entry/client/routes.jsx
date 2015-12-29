import { Route } from 'react-router';

import todoRoutes from 'TodoApp/client/routes'

ReactRouterSSR.Run(
	<Route>
		{todoRoutes}
	</Route>
	, {
		rootElement: "react-app",
		rootElementType: "span"
	});
