
const Users = ({ headers, userAgent, deviceType, region }) => {
  return (
    <section>
      <ol>
        <li>User Agent: { userAgent }</li>
        <li>Device Type: { deviceType }</li>
        <li>Client Region: { region }</li>
      </ol>

      <div style={{padding: '50px'}}>{ headers }</div>
    </section>
  );
}

export async function getServerSideProps(context) {
  const headers = context.req.headers;
  const UA = headers['user-agent'];
  const isMobile = Boolean(UA.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  ));
  const region = headers['cloudfront-viewer-country'];

  return {
    props: {
      headers: JSON.stringify(context.req.headers),
      userAgent: UA,
      deviceType: isMobile ? 'mobile' : 'desktop',
      region: region || null
    }
  }
}

export default Users;
