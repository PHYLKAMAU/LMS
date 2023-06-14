// DO NOT MODIFY
function readJsonFile(filename) {
  return new Promise((resolve, reject) => {
    fetch(`../data/${filename}`)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        console.log("Error:", error);
        reject(error.message);
      });
  });
}

class PostModule {
  // DO NOT MODIFY
  constructor() {
    this.posts = readJsonFile("posts.json")
      .then((posts) => posts)
      .catch((err) => {
        console.log(err);
        return [];
      });
    this.categories = readJsonFile("categories.json")
      .then((categories) => categories)
      .catch((err) => {
        console.log(err);
        return [];
      });
  }

  // return a list of all categories
  getAllCategories() {
    return new Promise((resolve, reject) => {
      this.categories
        .then((categories) => {
          if (categories.length === 0) {
            reject("No categories");
          } else {
            resolve(categories);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // return a list of all posts
  getAllPosts() {
    return new Promise((resolve, reject) => {
      this.posts
        .then((posts) => {
          resolve(posts);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // return a list of all posts whose published property is true
  getPublishedPosts() {
    return new Promise((resolve, reject) => {
      this.posts
        .then((posts) => {
          const publishedPosts = posts.filter((post) => post.published === true);
          resolve(publishedPosts);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // return a list of posts whose category property matches the given category
  getPostsByCategory(category) {
    return new Promise((resolve, reject) => {
      if (category) {
        category = parseInt(category);
        Promise.all([this.posts, this.categories])
          .then(([posts, categories]) => {
            const filteredPosts = posts.filter((post) => post.category === category);
            resolve(filteredPosts);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject("Category is required");
      }
    });
  }

  // return a post object whose id property matches the given postId
  getPostById(postId) {
    return new Promise((resolve, reject) => {
      if (postId) {
        postId = parseInt(postId);
        this.posts
          .then((posts) => {
            const post = posts.find((post) => post.id === postId);
            if (post) {
              resolve(post);
            } else {
              reject("Post not found");
            }
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject("Post ID is required");
      }
    });
  }
}

export default PostModule;
