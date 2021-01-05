/* eslint-disable no-unused-vars */
import React from 'react';
import { render } from 'react-dom';
import $ from 'jquery';
import { Post } from '@models/Post';
import { getResult, Utiil } from '@/babel';
// import json from './assets/json';
// import xml from './assets/data.xml';
// import csv from './assets/data.csv';
import webpackLogo from '@images/webpack.png';
import '@/styles/style.css';
import '@/styles/less.less';
import '@/styles/sass.sass';
import '@/styles/scss.scss';

const post = new Post({ title: 'Test post title!', img: webpackLogo });

console.log('post:', post);
getResult();

console.log('Utiil id :>> ', Utiil.id);

const App = () => (
  <div className="container">
    <h1>Webpack test</h1>
    <div className="logo"></div>
    <pre>{post.toString()}</pre>
    <pre className="pre" />
    <div className="box">
      <h2>Less</h2>
    </div>
    <div className="box2">
      <h2>Sass</h2>
    </div>
    <div className="box3">
      <h2>Scss</h2>
    </div>
  </div>
);

render(<App />, document.getElementById('app'));

$('.pre').html(post.toString());

// console.log('json :>> ', json);

// console.log('xml :>> ', xml);

// console.log('csv :>> ', csv);
