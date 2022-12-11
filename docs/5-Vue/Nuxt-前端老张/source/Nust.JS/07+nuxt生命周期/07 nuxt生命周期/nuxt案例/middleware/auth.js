export default function({store,route,redirect,params,query,req,res}){

	let token = store.state.token;
	// if( !token ){
	// 	redirect('/list');
	// }
	console.log( 'middleware auth' );

}