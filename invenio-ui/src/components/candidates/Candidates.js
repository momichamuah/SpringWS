import React, { Component } from 'react';
import { Route, Link, withRouter } from "react-router-dom";
class Candidates extends Component {
    render() {
        return (
            <div>
                    <section class="ftco-section ftco-candidates ftco-candidates-2 bg-light">
    	<div class="container">
    		<div class="row">
    			<div class="col-md-6">
    				<div class="team d-md-flex">
        			<div class="img" style={{backgroundImage: 'url(images/person_1.jpg)'}}></div>
        			<div class="text pl-md-4">
        				<span class="location mb-0">Western City, UK</span>
        				<h2>Danica Lewis</h2>
	        			<span class="position">Graduate</span>
	        			<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
	        			<span class="seen">Last Activity 4 months ago</span>
	        			<p><a href="#" class="btn btn-primary">Shortlist</a></p>
        			</div>
        		</div>
    			</div>
    			<div class="col-md-6">
    				<div class="team d-md-flex">
        			<div class="img" style={{backgroundImage: 'url(images/person_2.jpg)'}}></div>
        			<div class="text pl-md-4">
        				<span class="location mb-0">Western City, UK</span>
        				<h2>Danica Lewis</h2>
	        			<span class="position">Graduate</span>
	        			<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
	        			<span class="seen">Last Activity 4 months ago</span>
	        			<p><a href="#" class="btn btn-primary">Shortlist</a></p>
        			</div>
        		</div>
    			</div>
    			<div class="col-md-6">
    				<div class="team d-md-flex">
        			<div class="img" style={{backgroundImage: 'url(images/person_3.jpg)'}}></div>
        			<div class="text pl-md-4">
        				<span class="location mb-0">Western City, UK</span>
        				<h2>Danica Lewis</h2>
	        			<span class="position">Graduate</span>
	        			<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
	        			<span class="seen">Last Activity 4 months ago</span>
	        			<p><a href="#" class="btn btn-primary">Shortlist</a></p>
        			</div>
        		</div>
    			</div>
    			<div class="col-md-6">
    				<div class="team d-md-flex">
        			<div class="img" style={{backgroundImage: 'url(images/person_4.jpg)'}}></div>
        			<div class="text pl-md-4">
        				<span class="location mb-0">Western City, UK</span>
        				<h2>Danica Lewis</h2>
	        			<span class="position">Graduate</span>
	        			<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
	        			<span class="seen">Last Activity 4 months ago</span>
	        			<p><a href="#" class="btn btn-primary">Shortlist</a></p>
        			</div>
        		</div>
    			</div>
    			<div class="col-md-6">
    				<div class="team d-md-flex">
        			<div class="img" style={{backgroundImage: 'url(images/person_5.jpg)'}}></div>
        			<div class="text pl-md-4">
        				<span class="location mb-0">Western City, UK</span>
        				<h2>Danica Lewis</h2>
	        			<span class="position">Graduate</span>
	        			<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
	        			<span class="seen">Last Activity 4 months ago</span>
	        			<p><a href="#" class="btn btn-primary">Shortlist</a></p>
        			</div>
        		</div>
    			</div>
    			<div class="col-md-6">
    				<div class="team d-md-flex">
        			<div class="img" style={{backgroundImage: 'url(images/person_6.jpg)'}}></div>
        			<div class="text pl-md-4">
        				<span class="location mb-0">Western City, UK</span>
        				<h2>Danica Lewis</h2>
	        			<span class="position">Graduate</span>
	        			<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
	        			<span class="seen">Last Activity 4 months ago</span>
	        			<p><a href="#" class="btn btn-primary">Shortlist</a></p>
        			</div>
        		</div>
    			</div>
    		</div>
    		<div class="row mt-5">
          <div class="col text-center">
            <div class="block-27">
              <ul>
                <li><a href="#">&lt;</a></li>
                <li class="active"><span>1</span></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#">&gt;</a></li>
              </ul>
            </div>
          </div>
        </div>
    	</div>
    </section>
            </div>
        );
    }
}

export default withRouter(Candidates);