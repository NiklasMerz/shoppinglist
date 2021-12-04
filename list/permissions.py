from bridgekeeper import perms
from bridgekeeper.rules import R

perms['list.access_list'] = R(users=lambda user: user)
perms['list.access_item'] = R(list__users=lambda user: user)
perms['list.access_trip'] = R(list__users=lambda user: user)
perms['list.access_checkout'] = R(trip__list__users=lambda user: user)
perms['list.access_receipt'] = R(trip__list__users=lambda user: user)
perms['list.access_lineitem'] = R(receipt__trip__list__users=lambda user: user)