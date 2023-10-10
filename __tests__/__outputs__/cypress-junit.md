![Tests failed](https://img.shields.io/badge/tests-11%20passed%2C%201%20failed-critical)
## ❌ <a id="user-content-r0" href="#r0">fixtures/cypress-junit.xml</a>
**12** tests were completed in **151s** with **11** passed, **1** failed and **0** skipped.
|Test suite|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[](#r0s0)||||0ms|
|[Root Suite.newsfeed](#r0s1)|11✅|1❌||151s|
### ❌ <a id="user-content-r0s1" href="#r0s1">Root Suite.newsfeed</a>
```
newsfeed
  ❌ should handle biblia sharing
	TestingLibraryElementError: Timed out retrying after 4000ms: Unable to find an element with the text: Check out this cool verse on Biblia:. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.
  ✅ should poll for newsfeed items
  ✅ should be able to create and edit a post in a group
  ✅ should be able to create a post from the main newsfeed
  ✅ should be able to create a post with a URL and display opengraph data
  ✅ should be able to mention another user in a post
  ✅ should be able to flag a comment as inappropriate
  ✅ should support creating and editing an article post
  ✅ should be able to delete a comment
  ✅ should be able to pin and un-pin a post
  ✅ should be able to create and edit a prayer post
  ✅ should be able to search for hashtags within comments
```