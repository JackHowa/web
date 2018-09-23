import styled from "styled-components"
import theme from "../../components/theme"
import {Grid, Column} from "../../components/Grid"
import {Link} from "next/link"
import client from "../../createContentfulClient"

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

const StyledArticle = styled.article`
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
    fields: { photo, title, contributor },
    sys
  },
  className
}) => {
  return (
    <StyledArticle
      className={className}
      photo={photo ? photo.fields.file.url : "no-photo"}
    >
      <Link to={`/articles/${sys.id}`}>
        <div className="article__image" />

      <h4 className="article__title">{title}</h4>
      {contributor && (
        <p className="article__contributor">{contributor.fields.name}</p>
      )}      </Link>
    </StyledArticle>
  )
}

export default class ArticleList extends React.Component {
  static async getInitialProps() {
    const {items} = await client.getEntries(
      {
        content_type: "article",
        select: "sys.id,fields.title,fields.contributor,fields.photo"
      }
    )
    return {items}
  }
  render () {
    return (
      <div>
        { this.props.items.map(
          item =>
          <li>{item.fields.title}</li>
        )
      }

    </div>
    )
  }
}
