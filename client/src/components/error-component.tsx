import PageContainer from './page-container'

export default function ErrorComponent() {
  return (
    <PageContainer
      heading={'Sorry, something went wrong'}
      backButton={{ label: 'Return home', to: '/' }}
    ></PageContainer>
  )
}
