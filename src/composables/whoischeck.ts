export function useWhoisCheck() {
    function checkWhoisAvailability(domain: string) {
        if (!domain.trim().length) return;
        return fetch(`https://vue-domain-and-whois.onrender.com/whois`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ domain })
        }).then((response) => {
            return response.json()
        }).then((data) => {
            return data
        }).catch((error) => {
            return error
        })
    }
    return {
        checkWhoisAvailability
    }
}