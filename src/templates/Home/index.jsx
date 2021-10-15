import { Component } from 'react';

import './styles.css';

import { Button } from '../../components/Button';

import { Posts } from '../../components/Posts/index';
import { loadPosts } from '../../utils/load-posts';
import { TextInput } from '../../components/TextInput';
export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 3,
    searchValue:''
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage} = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  }

  loadMorePosts = () => {
    const {
      page, 
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nexPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nexPosts);

    this.setState({ posts, page: nextPage});

  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({searchValue: value});
  } 

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLocaleLowerCase()
      );
    }) 
    : posts;
    
    return (
      <section className="container">

          <div className="search-container">
            {!!searchValue && (
              <h1>Search value: {searchValue}</h1>
            )}
            <TextInput searchValue={searchValue} handleChange={this.handleChange} />
          </div>

          {filteredPosts.length > 0 && (
            <Posts posts={filteredPosts} />
          )}
        
          <div className="result-false">
            {filteredPosts.length === 0 && (
              <p>There are no posts with these words :/</p>
          )}
          </div>
        
          <div className="button-container">
            {!searchValue && (
              <Button  
                text="Load more" 
                onClick={this.loadMorePosts}
                disabled={noMorePosts}
              />
            )}
          </div>
        
      </section>
    );
  }
}