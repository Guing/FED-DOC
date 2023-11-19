import { useNavigate, useParams, useLocation, useSearchParams, useRoutes } from 'react-router-dom'
import routes from '../router';
export function withRouter(WrapperComponent) {
  return (props) => {
    const navigate = useNavigate()
    const params = useParams();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const query = Object.fromEntries(searchParams)
    const routesCpn = useRoutes(routes)
    return <WrapperComponent  {...props} router={{ navigate, params, location, query, routesCpn }} ></WrapperComponent>
  }
}