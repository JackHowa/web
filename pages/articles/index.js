import React from "react"

import styled from "styled-components"
import theme from "../../components/theme"
import {Grid, Column} from "../../components/Grid"
import Loader from "../../components/Loader"
import {Link} from "next/link"

import {createClient} from "contentful"

const ArticleListWrapper = styled(Grid)`
  margin-top: 10rem;
  margin-bottom: 10rem;
  .small-article-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 2rem;
  }
  .small-article {
    grid-column: span 2;
  }
`

const StyledArticle = styled.article `
  position: relative;
  .article__image {
    padding-bottom: 62.5%;
    background-color: ${theme.colors.primary["500"]};
    background-image: url(${props => props.photo});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

  }
  .article__title {
    margin-top: 2rem;
  }
  .article__contributor {
    margin-top: 1rem;
  }
  .article__link {
    margin-top: 1rem;
  }
  a {
    color: ${theme.colors.grey["900"]};
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`

const Article = ({
  article: {
    fields: {
      photo,
      title,
      contributor
    },
    sys
  },
  className
}) => {
  return (<StyledArticle className={className} photo={photo
      ? photo.fields.file.url
      : "no-photo"}>
    <Link to={`/articles/${sys.id}`}>
      <div className="article__image"/>

      <h4 className="article__title">{title}</h4>
      {contributor && (<p className="article__contributor">{contributor.fields.name}</p>)}
    </Link>
  </StyledArticle>)
}

class ArticleList extends React.Component {
  static async getInitialProps() {
    const client = createClient(
      {
        space: "021ulla0m5co",
        accessToken: "709d8f98e56158641d25ba23ceb57029ecc91e0a9a11f35fa6e0f666ffbeb4d0",
        host: "preview.contenful.com"
      })
    const {items} = await client.getEntries({content_type: "article", select: "sys.id,fields.title,fields.contributor,fields.photo"})

    componentDidMount = () => this.props.getArticles()

    render = () => {
      const {articles, loaded} = this.props
      const articlesArray = Object.values(articles)
      // first article
      const head = articlesArray[0]
      // copy because slice mutates articlesArray.
      const tail = [...articlesArray.slice(1)]
      if (!loaded)
        return <Loader/>
      return (<ArticleListWrapper container="container">
        <Column smOffset={1} sm={10}>
          <h4>Featured Articles</h4>
        </Column>
        <Column md={5} smOffset={1}>
          <Article article={head}/>
        </Column>
        <Column md={5} className="small-article-grid">
          {tail.map(article => (<Article key={article.sys.id} article={article} className="small-article"/>))}
        </Column>
      </ArticleListWrapper>)
    }
  }
}

export default ArticleList;
