const express = require("express");
const whoiser = require("whoiser");
var cors = require("cors");
var bodyParser = require("body-parser");
const dns = require("dns");
const isValidDomain = require("is-valid-domain");

const PORT = 3000;

var app = express();
app.use(bodyParser.json());
app.use(cors());

const isDomainAvailable = (domain) => {
  return new Promise((resolve) => {
    dns.resolve(domain, (error) => {
      if (error && error.code === "ENOTFOUND") {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

app.post("/whois", async (req, res) => {
  const { domain: domainName } = req.body;
  const isTldTr =
    domainName.split(".")[domainName.split(".").length - 1] == "tr"
      ? true
      : false;
  if (!domainName)
    return res.json({
      status: "error",
      message: "Alan adı boş bırakılamaz.",
      data: null,
    });

  if (!isValidDomain(domainName, { subdomain: false, wildcard: false }))
    return res.json({
      status: "error",
      message: "Lütfen geçerli bir alan adı giriniz.",
      data: null,
    });

  try {
    let response = await whoiser.domain(domainName, {
      raw: true,
      follow: 2,
      ignorePrivacy: false,
    });

    let data = {
      ...Object.values(response)[1],
      ...Object.values(response)[0],
      isTldTr,
    };
    return res.json({
      data: data,
      status: "success",
      message: "Whois sorgusu başarıyla gerçekleşti.",
    });
  } catch (error) {
    return res.json({
      data: null,
      status: "error",
      message: error.message,
    });
  }
});

app.post("/domain", (req, res) => {
  const { domain } = req.body;

  isDomainAvailable(domain)
    .then((available) => {
      if (available) {
        res.json({
          status: true,
          isDomainAvailable: true,
          message: `${domain} bu domain adresi alınmamıştır.`,
        });
      } else {
        res.json({
          status: true,
          isDomainAvailable: false,
          message: `${domain} bu domain adresi daha önce alınmıştır.`,
        });
      }
    })
    .catch((error) => {
      res.json({
        message: `Bir hata oluştu. Daha sonra tekrar deneyiniz. ${error.message}`,
        status: false,
      });
    }, 2000);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
