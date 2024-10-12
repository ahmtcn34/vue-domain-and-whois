import { ref } from "vue";

interface IState {
  domain: string;
  status: string;
  data: any;
  reason?: any;
}
export function useDomainCheck() {
  const domainsCheckState = ref<IState[]>();

  function checkDomainAvailability(domain: string) {
    domainsCheckState.value = [];
    const requestDomains = [];
    const tld = domain.split(".");
    tld.shift();
    const newTld = tld.join(".");
    const popularTld = [
      "com",
      "net",
      "org",
      "biz",
      "info",
      "io",
      "net.tr",
      "org.tr",
      "xyz",
      "com.tr"
    ];

    requestDomains.push(domain);
    domainsCheckState.value.push({
      domain: domain,
      status: "pending",
      data: null,
    });
    for (var tlds of popularTld) {
      if (tlds != newTld) {
        requestDomains.push(domain.split(".")[0] + "." + tlds);
        domainsCheckState.value.push({
          domain: domain.split(".")[0] + "." + tlds,
          status: "pending",
          data: null,
        });
      }
    }
    const requests = requestDomains.map(async (domain) => {
      return await fetch(`http://localhost:3000/domain`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domain: domain }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => ({
          url: domain,
          status: "fulfilled",
          data: res,
        }))
        .catch((error) => ({
          url: domain,
          status: "rejected",
          reason: error.message,
        }));
    });
    requests.forEach((request) => {
      request.then((result: any) => {
        if (result.status == "fulfilled") {
          domainsCheckState!.value!.find(
            (state) => state.domain == result?.url
          )!.status = "fulfilled";
          domainsCheckState!.value!.find(
            (state) => state.domain == result?.url
          )!.data = result.data;
        } else {
          domainsCheckState!.value!.find(
            (state) => state.domain == result.url
          )!.status = "rejected";
        }
      });
    });
  }
  return {
    domainsCheckState,
    checkDomainAvailability,
  };
}
