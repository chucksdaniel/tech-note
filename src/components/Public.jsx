import { Link } from "react-router-dom";

const Public = () => {
	const content = (
		<section className="public">
			<header>
				<h1>
					Welcome to <span className="nowrap">Dee Chucks Tech</span>
				</h1>
			</header>
			<main className="public__main">
				<p>
					Located in Beautiful Downtown Foo City, Dan D. Repairs provides a
					trained staff ready to meet your tech repair needs.
				</p>
				<address className="public__addr">
					Dee Chucks Tech
					<br />
					555 Foo Drive
					<br />
					Foo City, CA 12345
					<br />
					<a href="tel:+2347037910738">(234) 703-7910-738</a>
				</address>
				<br />
				<p>Owner: Chukwuma Daniel</p>
			</main>
			<footer>
				<Link to="/login">Employee Login</Link>
			</footer>
		</section>
	);
	return content;
};
export default Public;
