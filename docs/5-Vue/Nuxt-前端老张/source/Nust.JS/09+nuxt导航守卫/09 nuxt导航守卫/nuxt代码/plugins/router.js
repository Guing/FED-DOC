export default ({app})=>{
	app.router.beforeEach((to,from,next)=>{
		console.log( to );
		next();
	})
}