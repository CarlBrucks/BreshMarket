import requests
from bs4 import BeautifulSoup

basic_tg_nft_domain = "https://t.me/nft"

def GetInfoByName(name, id):
    image = None
    description = None
    responce = requests.get(f"{basic_tg_nft_domain}/{name}-{id}")

    soup = BeautifulSoup(responce.text, "html.parser")

    meta_og_tags = soup.find_all("meta", attrs={"property": lambda x: x and x.startswith("og:")})

    mark_tags = soup.find_all("mark")

    for tag in meta_og_tags:
        if tag['property'] != "og:image":
            continue
        image = tag['content']
        break
    for tag in meta_og_tags:
        if tag['property'] != "og:description":
            continue
        description = tag['content']
        break
    description_with_percents = ""
    print(description)
    for i in range(3):
        if not description_with_percents:
            description_with_percents = description.split("\n")[i] + " (" + mark_tags[i].text + ")"
            continue
        description_with_percents = description_with_percents + '\n' + description.split("\n")[i] + " (" + mark_tags[i].text + ")"

    return {"image": image, "description": description_with_percents}

"""for gift in gifts:
    print(GetInfoByName(gift['name'], gift['id']))"""