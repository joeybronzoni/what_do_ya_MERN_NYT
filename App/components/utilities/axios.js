import axios from 'axios';

let nytAPI = "83e51686ba784965ab1490f0ba363935",
    page = 1;

const Axios = {
    call: (search, begin, end) => {
        let queryURL = `http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${nytAPI}&q=${search}&begin_date=${begin}0101&end_date=${end}0101&page=${page}`;
        return axios.get(queryURL).then((response) => {
            let results = [];

            for(var i = 0, x = response.data.response.docs.length; i < x; i++){
                let object = {
                   title: response.data.response.docs[i].headline.main,
                   link: response.data.response.docs[i].web_url
                };
                results.push(object);
            }
            return results;
        });
    },

    getArticle: () => {
        return axios.get('/api/');
    },

    saveArticle: (article) => {
        return axios.post('/api/saved', article);
    },

    deleteArticle: (id) => {
        return axios.delete(`/api/saved/${id}`);
    }
};

export default Axios;

