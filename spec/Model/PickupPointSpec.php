<?php

namespace spec\Setono\SyliusPickupPointPlugin\Model;

use PhpSpec\ObjectBehavior;
use Setono\SyliusPickupPointPlugin\Model\PickupPoint;
use Setono\SyliusPickupPointPlugin\Model\PickupPointInterface;

final class PickupPointSpec extends ObjectBehavior
{
    function let(): void
    {
        $this->beConstructedWith('1','gls','Address','12345','London','England','23N','180E');
    }

    function it_is_initializable(): void
    {
        $this->shouldHaveType(PickupPoint::class);
    }

    function it_implements_an_pickup_point_interface(): void
    {
        $this->shouldImplement(PickupPointInterface::class);
    }

    function it_has_id(): void
    {
        $this->getId()->shouldReturn('1');
    }

    function it_has_name(): void
    {
        $this->getName()->shouldReturn('gls');
    }

    function it_has_address(): void
    {
        $this->getAddress()->shouldReturn('Address');
    }

    function it_has_zipcode(): void
    {
        $this->getZipCode()->shouldReturn('12345');
    }

    function it_has_city(): void
    {
        $this->getCity()->shouldReturn('London');
    }

    function it_has_country(): void
    {
        $this->getCountry()->shouldReturn('England');
    }

    function it_has_latitude(): void
    {
        $this->getLatitude()->shouldReturn('23N');
    }

    function it_has_longitude(): void
    {
        $this->getLongitude()->shouldReturn('180E');
    }
}
