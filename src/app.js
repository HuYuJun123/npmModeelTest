import React from 'react';
import ReactDOM from 'react-dom';

import RollingLoading from './rollingLoading';
let title = "title-cs"
let desc = "desc-cs"
let loading = true
ReactDOM.render(<RollingLoading
    title={title}
    desc={desc}
    loading={loading}
>children</RollingLoading>, document.getElementById('app'));