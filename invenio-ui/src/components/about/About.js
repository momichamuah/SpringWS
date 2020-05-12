import React, { Component } from 'react';
import { Route, Link, withRouter } from "react-router-dom";
class About extends Component {
    render() {
        return (
            <div>
         <section class="ftco-section">
    	<div class="container">
    		<div class="row justify-content-center">
    			<div class="col-md-10">
    				<div class="intro row text-center justify-content-center">
    					<div class="col-md-9">
    						<img class="img-fluid" src="images/undraw_work_time_lhoj.svg" alt=""/>
    					</div>
    					<h2 class="mb-4">Welcome to INVENIO</h2>
    					<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
    					<p>On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their.</p>
    				</div>
    			</div>
    		</div>
    	</div>
    </section>
            </div>
        );
    }
}

export default withRouter(About);